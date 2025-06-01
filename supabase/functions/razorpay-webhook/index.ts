import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";
import { createHmac } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Razorpay-Signature",
};

const RAZORPAY_WEBHOOK_SECRET = "2@m@SyULhjNkpcw";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const verifyWebhookSignature = (payload: string, signature: string): boolean => {
  const hmac = createHmac("sha256", RAZORPAY_WEBHOOK_SECRET);
  const digest = hmac.update(payload).digest("hex");
  return digest === signature;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get("x-razorpay-signature");
    if (!signature) {
      throw new Error("Missing Razorpay signature");
    }

    const body = await req.text();
    
    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature)) {
      throw new Error("Invalid webhook signature");
    }

    const payload = JSON.parse(body);
    const { event, payload: eventPayload } = payload;

    console.log("Received webhook event:", event);
    console.log("Event payload:", eventPayload);

    // Extract payment details
    const paymentDetails = {
      event_type: event,
      payment_id: eventPayload.payment?.entity?.id,
      order_id: eventPayload.order?.entity?.id,
      status: eventPayload.payment?.entity?.status || eventPayload.order?.entity?.status,
      amount: eventPayload.payment?.entity?.amount || eventPayload.order?.entity?.amount,
      email: eventPayload.payment?.entity?.email || eventPayload.order?.entity?.email,
      raw_data: payload
    };

    // Store the webhook event in Supabase
    const { error } = await supabase
      .from("payment_events")
      .insert(paymentDetails);

    if (error) {
      console.error("Error storing payment event:", error);
      throw error;
    }

    return new Response(
      JSON.stringify({ 
        message: "Webhook processed successfully",
        event: event,
        status: paymentDetails.status
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createCipher } from "npm:crypto@3.1.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const ENCRYPTION_KEY = Deno.env.get("ENCRYPTION_KEY");
const IV = Deno.env.get("ENCRYPTION_IV");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { data } = await req.json();

    if (!ENCRYPTION_KEY || !IV) {
      throw new Error("Encryption configuration missing");
    }

    const cipher = createCipher("aes-256-cbc", ENCRYPTION_KEY);
    let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
    encrypted += cipher.final("hex");

    return new Response(
      JSON.stringify({ encrypted }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
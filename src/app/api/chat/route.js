import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Aquí es donde nace la variable "message"
    const body = await request.json();
    const message = body.message;

    if (!message) {
      return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 });
    }

    console.log("1. Mensaje recibido:", message);

    // --- 1. LLAMADA A GOOGLE GEMINI ---
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    // Al estar dentro de la función, ahora sí puede leer ${message}
    const geminiPrompt = `
      Eres el asistente virtual 24/7 de la clínica veterinaria "Cevet", ubicada en Av. Central 555, Mz. M - Lt. 23 Gr. 3 Sec. 1 - Villa El Salvador, Lima.
      Tus horarios de atención son: Lunes a Domingo de 9:00 AM a 6:00 PM.

      Analiza el siguiente mensaje del usuario y responde ÚNICAMENTE con un objeto JSON válido que contenga exactamente dos propiedades:
      1. "clasificacion": Escribe estrictamente "emergencia" (si hay sangrado, convulsiones, atropellos, envenenamiento o riesgo de muerte) o "consulta" (para dudas generales, vacunas, horarios, etc.).
      2. "respuesta_usuario": Tu respuesta conversacional, empática y natural para el usuario. Si es una emergencia, indícales que vengan de inmediato y que el equipo fue notificado. Si es una duda, respóndela basándote en tu información.

      Mensaje del usuario: "${message}"
    `;

    const geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: geminiPrompt }] }]
      }),
    });

    if (!geminiRes.ok) {
      console.error("Error en Gemini API:", await geminiRes.text());
      return NextResponse.json({ message: "Nuestros servidores están muy ocupados. Por favor, llámanos directamente a la clínica +51 913 696 049. Muchas gracias." });
    }

    const geminiData = await geminiRes.json();
    const responseText = geminiData.candidates[0].content.parts[0].text;
    console.log("2. Respuesta cruda de IA:", responseText);

    // Limpieza y parseo del JSON
    const cleanJsonText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const aiResponse = JSON.parse(cleanJsonText);
    
    // Asignamos la respuesta conversacional de la IA para enviarla al frontend
    let botReply = aiResponse.respuesta_usuario;

    // --- 2. LLAMADA A META WHATSAPP ---
    if (aiResponse.clasificacion === "emergencia") {
      console.log("3. Es emergencia, enviando alerta por WhatsApp...");
      
      const waRes = await fetch(`https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: process.env.VETERINARY_PHONE_NUMBER,
          type: "text",
          text: { body: `🚨 *ALERTA DE TRIAJE VETERINARIO* 🚨\n\nEl bot detectó una emergencia en la web.\n\n*Síntoma reportado:*\n"${message}"` }
        }),
      });

      if (!waRes.ok) {
        console.error("Error en WhatsApp API:", await waRes.text());
      } else {
        console.log("4. ¡Alerta de WhatsApp enviada con éxito!");
      }
    }

    return NextResponse.json({ message: botReply });

  } catch (error) {
    console.error("Error crítico en el backend:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
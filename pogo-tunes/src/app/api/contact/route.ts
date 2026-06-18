import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      )
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      source: "pogo-tunes-contact-form",
    }

    let sent = false

    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Pogo Tunes <noreply@pogotunes.vercel.app>",
            to: ["azadg26@gmail.com"],
            subject: `New contact from ${payload.name}`,
            text: `Name: ${payload.name}\nEmail: ${payload.email}\nMessage: ${payload.message}`,
          }),
        })
        if (res.ok) sent = true
      } catch {
        // Resend failed, fall through to mailto
      }
    }

    const mailtoUrl = `mailto:azadg26@gmail.com?subject=${encodeURIComponent(`Contact from ${payload.name}`)}&body=${encodeURIComponent(`Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`)}`

    return NextResponse.json(
      {
        success: true,
        sent,
        mailtoUrl,
        message: sent
          ? "Thank you! Your message has been sent successfully."
          : "Thank you! We'll get back to you soon.",
      },
      { status: 200 },
    )
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}

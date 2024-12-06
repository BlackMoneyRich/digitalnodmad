// import ProductEmail from "@/app/components/ProductEmail";
// import { stripe } from "@/app/lib/stripe";

// import { headers } from "next/headers";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   const body = await req.text();

//   const signature = headers().get("Stripe-Signature") as string;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_SECRET_WEBHOOK as string
//     );
//   } catch (error: unknown) {
//     return new Response("webhook error", { status: 400 });
//   }

//   switch (event.type) {
//     case "checkout.session.completed": {
//       const session = event.data.object;

//       const link = session.metadata?.link;

//       const { data, error } = await resend.emails.send({
//         from: "send <onboarding@resend.dev>",
//         to: ["dark.master.thailand@gmail.com"],
//         subject: "Your Product from MarshalUI",
//         react: ProductEmail({
//           link: link as string,
//         }),
//       });

//       break;
//     }
//     default: {
//       console.log("unhandled event");
//     }
//   }

//   return new Response(null, { status: 200 });
// }



import ProductEmail from "@/app/components/ProductEmail";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import { Resend } from "resend";
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_SECRET_WEBHOOK as string
      );
    } catch (error: any) {
      console.error("Webhook error:", error.message);
      return NextResponse.json(
        { error: 'Webhook error' },
        { status: 400 }
      );
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      
      // ดึงอีเมลลูกค้าและข้อมูลอื่นๆ
      const customerEmail = session.customer_details?.email;
      const link = session.metadata?.link;

      // บันทึก log ลงไฟล์หรือ console
      console.log('=================== START PAYMENT LOG ===================');
      console.log('Session ID:', session.id);
      console.log('Customer Email:', customerEmail);
      console.log('Product Link:', link);
      console.log('Full Session:', JSON.stringify(session, null, 2));

      if (customerEmail) {
        try {
          const { data, error } = await resend.emails.send({
            from: "MarshalUI <onboarding@resend.dev>",
            to: [customerEmail],
            subject: "Your Product from MarshalUI",
            react: ProductEmail({
              link: link as string,
            }),
          });

          if (error) {
            console.error('Email Error:', error);
            return NextResponse.json(
              { error: 'Email sending failed' },
              { status: 500 }
            );
          }

          console.log('Email Sent Successfully:', {
            to: customerEmail,
            emailId: data?.id
          });
        } catch (emailError: any) {
          console.error('Email Send Error:', emailError.message);
          return NextResponse.json(
            { error: 'Email sending error' },
            { status: 500 }
          );
        }
      } else {
        console.warn('No customer email found in session');
      }
      console.log('=================== END PAYMENT LOG ===================');
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('General Error:', error.message);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

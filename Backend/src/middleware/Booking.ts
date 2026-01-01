// import Stripe from "stripe"
// import dotenv from "dotenv"

// dotenv.config()

// //Stripe Instance
// const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY as string)

// //Creating Line item for stripe
// const line_items = [{
//     price_date:{
//         currency:"gbp",
//         product_data:{

//         },
//         unit_amount:Math.floor(Booking.amount) * 100 
//     },
//     quantity:1
// },]

// //Payment session 
 

// const session = await stripeInstance.checkout.sessions.create({
//     success_url:`${process.env.FRONTEND_URL as string}/bookings`,
//     cancel_url:`${process.env.FRONTEND_URL as string}/bookings`,
//     line_items:line_items,
//     mode:'payment',
//     metadata:{
//         bookingId:.toString();
//     },
//     expires_at:Math.floor(Date.now() / 1000) + 30 * 60, //expires in 30 minutes
// })

// booking.paymentLink = session.url
// await booking.save()
import cron from "node-cron";
import { endOfDay, startOfDay, subDays } from "date-fns";
import ConnectionRequestModel from "../models/connection.request.js";
import * as sendEmail from "../utils/sendEmail.js";

export function startCronJob() {
  cron.schedule("10 12 * * *", async () => {
    console.log("Cron job is running at 8:00 AM every day");
    try {
      const yesterday = subDays(new Date(), 0);
      const yesterdayStart = startOfDay(yesterday);
      const yesterdayEnd = endOfDay(yesterday);

      const pendingRequests = await ConnectionRequestModel.find({
        status: "interested",
        createdAt: {
          $gte: yesterdayStart,
          $lt: yesterdayEnd,
        },
      }).populate("fromUserId toUserId");

      // const listOfEmails = [
      //   ...new Set(pendingRequests.map((req) => req.toUserId)),
      // ];
      // console.log(listOfEmails);

      for (const request of pendingRequests) {
        try {
          const subject = "Pending Connection Request";
          const body = `You have a pending connection request from ${request.fromUserId.firstName}. Please review it.`;
          const toEmailId = request.toUserId.emailId;

          const res = await sendEmail.run(subject, body, toEmailId);
          console.log(`Email sent to ${toEmailId}: ${JSON.stringify(res)}`);
        } catch (err) {
          console.log(
            `Error sending email to ${request.toUserId.emailId}: ${err.message}`
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
}

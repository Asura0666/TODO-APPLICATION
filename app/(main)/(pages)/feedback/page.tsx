import FeedbackForm from "@/components/feedback/feedback-form";
import FeedbackResult from "@/components/feedback/feedback-result";
import React from "react";

type Props = {};

const FeedbackPage = (props: Props) => {
  return (
    <main className="m-auto my-4 max-w-5xl px-3 space-y-10">
      <div className="space-y-3 text-center">
        <h1 className="text-lg md:text-xl dark:text-cream">
          Manage Your Feedback
        </h1>
        <p className="dark:text-cream/60">
          Share your thoughts and suggestions to help us improve.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full justify-center">
        <div className="col-span-2">
          <FeedbackForm
            title="Your Feedback Matters"
            subTitle="Tell us what you think about our new feature!"
          />
        </div>
        <div className="col-span-1 md:col-span-2 h-full overflow-auto ">
          <FeedbackResult />
        </div>
      </section>
    </main>
  );
};

export default FeedbackPage;

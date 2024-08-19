import ButtonHandler from "@/components/forms/sign-up/button-handlers";
import SignUpFormProvider from "@/components/forms/sign-up/form-provider";
import HighLightBar from "@/components/forms/sign-up/highlight-bar";
import RegistrationFormStep from "@/components/forms/sign-up/registration-step";

type Props = {};

const SignUpPage = (props: Props) => {
  return (
    <div className="flex-1 py-10 md:px-16 w-full overflow-y-hidden">
      <div className="flex flex-col h-full gap-3">
        <SignUpFormProvider>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <RegistrationFormStep />
              <ButtonHandler />
            </div>
            <HighLightBar />
          </div>
        </SignUpFormProvider>
      </div>
    </div>
  );
};

export default SignUpPage;

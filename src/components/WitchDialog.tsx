import Dialog, { type DialogProps } from "@/components/Dialog.tsx";

interface WitchDialogProps extends DialogProps {
  imageSrc: string;
}

const WitchDialog = ({
  messages,
  nextPage,
  imageSrc,
  buttonText,
  hideNextButton,
}: WitchDialogProps) => {
  return (
    <div className="flex z-0 h-[100vh] w-[100vw] flex-row items-end justify-center pb-1 lg:flex-col lg:items-center lg:justify-end lg:p-12">
      <div className="h-1/5 w-1/12">
        <img
          src={imageSrc}
          alt="logo"
          className="absolute left-[-10%] top-[10%] w-1/2"
        />
      </div>
      <Dialog
        messages={messages}
        nextPage={nextPage}
        buttonText={buttonText}
        hideNextButton={hideNextButton}
      />
    </div>
  );
};
export default WitchDialog;

import Dialog, { DialogProps } from "@/components/Dialog.tsx";

interface WitchDialogProps extends DialogProps {
  imageSrc: string;
}

const WitchDialog = ({ messages, nextPage, imageSrc, buttonText, hideNextButton }: WitchDialogProps) => {
  return (
    <div className="w-[100vw] h-[100vh] z-10 flex flex-row lg:flex-col justify-center lg:justify-end items-end lg:items-center pb-1 lg:p-12">
      <div className="w-1/12 h-1/5">
        <img
          src={imageSrc}
          alt="logo"
          className="left-[-10%] top-[10%] w-1/2 absolute"
        />
      </div>
      <Dialog messages={messages} nextPage={nextPage} buttonText={buttonText} hideNextButton={hideNextButton} />
    </div>
  );
};
export default WitchDialog;

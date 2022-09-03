import { Button } from "components/elements";
import { ArrowLeft, ArrowRight } from "phosphor-react";

interface PaginationProps {
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export const Pagination = (props: PaginationProps) => {
  return (
    <div className="flex items-center gap-3 border border-card rounded py-2 px-4">
      <Button
        disabled={!props.hasPrev}
        onClick={props.onPrev}
        variant="highlight"
        className="px-0 py-0 w-[40px] h-[30px] flex justify-center items-center"
      >
        <ArrowLeft size={18} weight="bold" />
      </Button>
      <Button
        disabled={!props.hasNext}
        onClick={props.onNext}
        variant="highlight"
        className="px-0 py-0 w-[40px] h-[30px] flex justify-center items-center"
      >
        <ArrowRight size={18} weight="bold" />
      </Button>
    </div>
  );
};

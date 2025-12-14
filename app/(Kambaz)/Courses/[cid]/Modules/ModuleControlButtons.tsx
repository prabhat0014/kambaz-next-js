import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import { FaTrash, FaPencil } from "react-icons/fa6";
export default function LessonControlButtons({moduleId, deleteModule, setModuleForEdit} : {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  setModuleForEdit: (moduleId: string) => void;
}) {
  return (
    <div className="float-end">
      <FaPencil className="text-primary me-2" onClick={() => setModuleForEdit(moduleId)} />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>
      <GreenCheckmark />
      <BsPlus className="fs-3" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
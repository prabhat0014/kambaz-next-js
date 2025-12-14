"use client";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addModule, editModule, updateModule, setModules } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";
export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const {modules} = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();
  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules.map((m: any) => ({ ...m, editing: false }))));
  };
  useEffect(() => {
    fetchModules();
  }, []);

  const onCreateModuleForCourse = async () => {
    if (!cid) {
      return;
    }
    const newModule = { name: moduleName, course: cid };
    await client.createModuleForCourse(cid as string, newModule);
    fetchModules();
  };

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(cid as string, moduleId);
    fetchModules();
  };

  const onUpdateModule = async (module: any) => {
    await client.updateModule(cid as string, module);
    fetchModules();
  };

  const setModuleForEdit = (moduleId: any, value: boolean) => {
    const newModules = modules.map((m: any) => m._id === moduleId ? {...m, editing: value}: m);
    dispatch(setModules(newModules));
  }

  const changeModuleName = (moduleId: string, newName: string) => {
    const newModules = modules.map((m: any) => m._id === moduleId ? {...m, name: newName}: m);
    dispatch(setModules(newModules));
  }

  return (
    <div>
      <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={onCreateModuleForCourse} />
      <br />
      <br />
      <br />
      <br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
        .map((module: any) => (
            <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                { module.editing && (

                  <FormControl className="w-50 d-inline-block"
                        onChange={(e) => changeModuleName(module._id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setModuleForEdit(module._id, false);
                            onUpdateModule({...module, editing: false});
                          }
                        }}
                        defaultValue={module.name}/>
                )}
                <ModuleControlButtons moduleId={module._id}
                setModuleForEdit={(moduleId) => setModuleForEdit(moduleId, true)}
                deleteModule={(moduleId) => onRemoveModule(moduleId)} />
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
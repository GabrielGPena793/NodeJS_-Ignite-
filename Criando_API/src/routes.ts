import { Request, Response } from "express";
import CreateCourseService from "./CreateCourseService";

export function createCourse(request: Request, response: Response) {

  CreateCourseService.execute({
    name: "NodeJS",
    educator: "Dani"
    
  });

  CreateCourseService.execute({
    name: "ReactJS",
    educator: "Diego",
    duration: 5
    
  });

  return response.send()
}
interface Course {
  name: string;
  duration?: number;
  educator:string
}

class CreateCourseService{
  execute({name, duration, educator}: Course){
    console.log(educator, name, duration )
  }
}

export default new CreateCourseService;
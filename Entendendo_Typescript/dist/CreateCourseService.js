"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCourseService {
    execute({ name, duration, educator }) {
        console.log(educator, name, duration);
    }
}
exports.default = new CreateCourseService;

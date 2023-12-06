// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Course {
    address owner;
    uint256 public index = 0;

    struct Classroom {
        string courseName;
        uint numLessons;
        uint256 price;
        address teacher;
        uint numStudents;
        bool available;
    }

    mapping( uint => Classroom) courses;

    event Published(uint256 _id);
    event Log(string func);

    constructor() {
        owner = msg.sender;
    }

    function publishCourse(string calldata _courseName, uint _numLessons, uint256 _price) external {
        Classroom memory newCourse = Classroom(
            _courseName,
            _numLessons,
            _price,
            msg.sender,
            0,
            true
        );

        courses[index] = newCourse;

        emit Published(index);

        index++;
    }

    function removeCourse(uint _index) external {
        require(courses[_index].available, "Course doesn't exist");
        require(courses[_index].teacher == msg.sender || msg.sender == owner, 
            "Only the teacher or owner of the contract can remove the course");

        courses[_index].available = false;
    }

    function getCourse(uint _index) external view returns(Classroom memory) {
        return courses[_index];
    }

    fallback() external {
        emit Log("fallback");
    }

}
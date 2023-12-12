// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Course {
    address owner;
    uint256 public index = 0;

    struct Classroom {
        uint index;
        string courseName;
        uint numLessons;
        uint price;
        address teacher;
        uint numStudents;
        bool available;
    }

    struct Progress {
        bool joined;
        uint lessonsCompleted;
    }

    mapping( uint => Classroom) courses;
    mapping( address => mapping( uint => Progress)) students;

    event Published(uint256 _id);
    event Log(string func);
    event Purchased(uint256 _id, address student);

    constructor() {
        owner = msg.sender;
    }

    function publishCourse(string calldata _courseName, uint _numLessons, uint256 _price) external {
        Classroom memory newCourse = Classroom(
            index,
            _courseName,
            _numLessons,
            _price,
            msg.sender,
            0,
            true
        );

        courses[index] = newCourse;

        emit Published(index);

        index = index + 1;
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

    function purchaseCourse(uint _index) external payable {
        require(courses[_index].teacher != msg.sender, "Teachers can't purchase their own courses!");
        require(msg.sender.balance >= courses[_index].price, "Not enough funds");
        require(!hasJoined(msg.sender, _index), "You have already joined this course");

        students[msg.sender][_index].joined = true;
        emit Purchased(_index, msg.sender);

        courses[_index].numStudents++;
    }

    function hasJoined(address _student, uint _index) private view returns(bool) {
        return students[_student][_index].joined;
    }

    function hasJoinedCourses(address _student, uint[] memory _courses) private view returns(uint[] memory) {
        uint[] memory joined;

        uint joinedIndex = 0;
        for (uint i = 0; i < _courses.length; i++) {
            if (students[_student][i].joined) {
                joined[joinedIndex] = i;
                joinedIndex++;
            }
        }

        return joined;
    }

    function getProgress(uint _index) external view returns(Progress memory) {
        require(hasJoined(msg.sender, _index), "You haven't joined this course");
        return students[msg.sender][_index];
    }

    fallback() external {
        emit Log("fallback");
    }

}
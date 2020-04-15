import React from "react";
import ReactDOM from "react-dom";
import AuthorQuiz from "./AuthorQuiz";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount, shallow } from "enzyme";
Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: [
      "Harry Potter and the Sorcerers Stone",
      "The Adventures of Huckleberry Finn",
      "The Shining",
    ],
    author: {
      name: "Mark Twain",
      imageUrl: "images/authors/marktwain.jpg",
      imageSource: "Wikimedia Commons",
      books: ["The Adventures of Huckleberry Finn"],
    },
  },
  highlight: "none",
};

describe("Author Quiz", () => {
  it("renders withouth crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}} />, div);
  });

  describe("When no answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}} />);
    });

    it("should have no background color", () => {
      expect(wrapper.find("div.row.turn").props().style.background).toBe("");
    });
  });

  describe("When the wrong answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz
          {...Object.assign({}, state, { highlight: "wrong" })}
          onAnswerSelected={() => {}}
        />
      );
    });

    it("should have a red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.background).toBe("red");
    });
  });

  describe("When the correct answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz
          {...Object.assign({}, state, { highlight: "correct" })}
          onAnswerSelected={() => {}}
        />
      );
    });

    it("should have a green background color", () => {
      expect(wrapper.find("div.row.turn").props().style.background).toBe(
        "green"
      );
    });
  });

  describe("When the first answer is selected", () => {
    let wrapper;
    const handleAnswerSelected = jest.fn();
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} />);
      wrapper.find('.answer').first().simulate('click');
    });

    it("onAnswerSelected should be called", () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it("selected receive 'Harry Potter and the Sorcerers Stone'", () => {
      expect(handleAnswerSelected).toHaveBeenCalledWith("Harry Potter and the Sorcerers Stone");
    });
  });
});

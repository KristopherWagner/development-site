import React from "react";
import { render } from "@testing-library/react";
import Parallax from ".";

describe("Parallax componet tests", () => {
  it("renders without crashing", () => {
    const { rerender } = render(
      <Parallax aspectRatio="1920/1080" mobile url="test" />
    );
    rerender(<Parallax aspectRatio="4/3" url="test" />);
  });
});

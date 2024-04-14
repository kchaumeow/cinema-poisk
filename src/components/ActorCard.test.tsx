import { render, screen } from "@testing-library/react";
import ActorCard from "./ActorCard";
import { Person } from "../types";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("ActorCard", () => {
  const mockActor = {
    name: "Test Actor",
    photo: "test.jpg",
    profession: "Actor",
  } as Person;

  it("renders actor name", () => {
    render(<ActorCard actor={mockActor} />);
    const actorName = screen.getByText(/Test Actor/i);
    expect(actorName).toBeInTheDocument();
  });

  it("renders actor profession", () => {
    render(<ActorCard actor={mockActor} />);
    const actorProfession = screen.getByText(/Actor/i);
    expect(actorProfession).toBeInTheDocument();
  });

  it("renders actor image", () => {
    render(<ActorCard actor={mockActor} />);
    const actorImage = screen.getByAltText(/Test Actor/i);
    expect(actorImage).toHaveAttribute("src", "test.jpg");
  });
});

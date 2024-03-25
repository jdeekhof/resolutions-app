import React from "react"
import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CreateGoalForm from "../../../../app/javascript/bundles/Resolutions/Components/CreateGoalForm"

describe("CreateGoalForm", () => {
  const mockRefreshGoals = jest.fn();
  const mockCreateGoal = jest.fn().mockResolvedValue({ message: "Goal created successfully" });
  const validInputs = async () => {
    const titleInput = screen.getByLabelText("Describe Goal");
    const comparatorSelect = screen.getByLabelText("I want to (spend, walk, eat, etc.)");
    const targetValueInput = screen.getByPlaceholderText(1);
    const targetMetricInput = screen.getByPlaceholderText("steps, pages, etc.");
    const intervalInput = screen.getByLabelText("Within this interval")

    await userEvent.type(titleInput, "Read more books");
    userEvent.selectOptions(comparatorSelect, "More Than");
    await userEvent.type(targetValueInput, "20");
    await userEvent.type(targetMetricInput, "pages");
    await userEvent.type(intervalInput, "per day");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
  }
  beforeEach(() => {
    jest.clearAllMocks();
    render(<CreateGoalForm refreshGoals={mockRefreshGoals} createGoal={mockCreateGoal} />);
  });

  it("displays validation errors when required fields are missing", async () => {
    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    // Wait for any asynchronous actions to complete
    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
      expect(screen.getByText("Value is required")).toBeInTheDocument();
      expect(screen.getByText("Metric is required")).toBeInTheDocument();
      expect(screen.getByText("Interval is required")).toBeInTheDocument();
    });

    expect(mockCreateGoal).not.toHaveBeenCalled();
  });

  it("submits the form and calls createGoal with correct data", async () => {
    validInputs()
    await waitFor(() => {
      expect(mockCreateGoal).toHaveBeenCalledWith({
        title: "Read more books",
        comparator: "1",
        targetValue: 20,
        targetMetric: "pages",
        interval: "per day"
      });
    });
    expect(mockRefreshGoals).toHaveBeenCalled();
  });
});

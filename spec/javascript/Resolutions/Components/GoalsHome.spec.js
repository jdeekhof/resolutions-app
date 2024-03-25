import React from 'react'
import "@testing-library/jest-dom"
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GoalsHome from "../../../../app/javascript/bundles/Resolutions/Components/GoalsHome"

describe("GoalsHome", () => {
  it("renders correctly", () => {
    render(<GoalsHome />)
    expect(screen.getByText("Current Goals")).toBeInTheDocument()
    expect(screen.getByText("Create New Goal")).toBeInTheDocument()
    expect(screen.getByText("Log New Stat")).toBeInTheDocument()
    expect(screen.getByText("No Goals Yet"))
  })
})




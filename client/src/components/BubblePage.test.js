import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";
import { fetchColors as mockFetchColors } from '../api/fetchColors'
import { mockColorsData } from '../utils/mockColorsData'
import Bubbles from './Bubbles'

jest.mock('../api/fetchColors')


test("Fetches data and renders the bubbles", () => {
  mockFetchColors.mockResolvedValue(mockColorsData)

  const { rerender } = render(<BubblePage />)

  const { getAllByTestId } = render(<Bubbles colors={mockColorsData.data} />)

  const bubbles = getAllByTestId(/bubble/i)
  expect(bubbles).toHaveLength(2)
});

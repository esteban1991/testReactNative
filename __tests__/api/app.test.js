import React from "react";
import {
	render,
	waitFor,
	screen,
	fireEvent,
} from "@testing-library/react-native";
import Login from "../../screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
jest.useFakeTimers();



describe("<Login />", () => {
  
	it("Fiding Login", async () => {
		render(<Login />);
		const input = screen.getByText("Login");	
    expect(input).toBeTruthy();
	});

  it("Fiding button", async () => {
		render(<Login />);
		const btn = screen.getByText("SIGN IN");	
    expect(btn).toBeTruthy();
	});

});



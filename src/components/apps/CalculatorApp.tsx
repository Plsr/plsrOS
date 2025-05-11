import { useState } from "react";
import { CalculatorButton } from "../ui/CalculatorButton";
import { CalculatorInput } from "../ui/CalculatorInput";
import { StripedBackground } from "../ui/StripedBackground";

export const CalculatorApp = () => {
  const [display, setDisplay] = useState("0");
  const [storedNumber, setStoredNumber] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumberClick = (number: string) => {
    if (waitingForOperand) {
      setDisplay(number);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? number : display + number);
    }
  };

  const handleOperationClick = (op: string) => {
    const currentValue = parseFloat(display);

    if (storedNumber === null) {
      setStoredNumber(currentValue);
    } else if (operation) {
      const result = calculateResult();
      setStoredNumber(result);
      setDisplay(String(result));
    }

    setOperation(op);
    setWaitingForOperand(true);
  };

  const calculateResult = () => {
    const currentValue = parseFloat(display);

    if (storedNumber === null) return currentValue;

    switch (operation) {
      case "+":
        return storedNumber + currentValue;
      case "-":
        return storedNumber - currentValue;
      case "*":
        return storedNumber * currentValue;
      case "/":
        return storedNumber / currentValue;
      default:
        return currentValue;
    }
  };

  const handleEquals = () => {
    if (operation && storedNumber !== null) {
      const result = calculateResult();
      setDisplay(String(result));
      setStoredNumber(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setStoredNumber(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  console.log(display);
  return (
    <StripedBackground className="inline-block py-4 px-2">
      <div className="flex flex-col p-2">
        {/* Display */}
        <CalculatorInput>{display}</CalculatorInput>

        {/* Buttons */}
        <div className="grid grid-cols-5 gap-2 mt-4">
          {/* Row 1 */}
          <CalculatorButton onClick={() => {}}>MC</CalculatorButton>
          <CalculatorButton onClick={() => {}}>MR</CalculatorButton>
          <CalculatorButton onClick={() => {}}>MS</CalculatorButton>
          <CalculatorButton onClick={() => {}}>M+</CalculatorButton>
          <CalculatorButton onClick={handleClear}>C</CalculatorButton>

          {/* Row 2 */}
          <CalculatorButton onClick={() => handleNumberClick("7")}>
            7
          </CalculatorButton>
          <CalculatorButton onClick={() => handleNumberClick("8")}>
            8
          </CalculatorButton>
          <CalculatorButton onClick={() => handleNumberClick("9")}>
            9
          </CalculatorButton>
          <CalculatorButton onClick={() => handleOperationClick("/")}>
            /
          </CalculatorButton>
          <CalculatorButton onClick={() => {}}>sqrt</CalculatorButton>

          {/* Row 3 */}
          <CalculatorButton onClick={() => handleNumberClick("4")}>
            4
          </CalculatorButton>
          <CalculatorButton onClick={() => handleNumberClick("5")}>
            5
          </CalculatorButton>
          <CalculatorButton onClick={() => handleNumberClick("6")}>
            6
          </CalculatorButton>
          <CalculatorButton onClick={() => handleOperationClick("*")}>
            *
          </CalculatorButton>
          <CalculatorButton onClick={() => {}}>%</CalculatorButton>

          {/* Row 4 */}
          <CalculatorButton onClick={() => handleNumberClick("1")}>
            1
          </CalculatorButton>
          <CalculatorButton onClick={() => handleNumberClick("2")}>
            2
          </CalculatorButton>
          <CalculatorButton onClick={() => handleNumberClick("3")}>
            3
          </CalculatorButton>
          <CalculatorButton onClick={() => handleOperationClick("-")}>
            -
          </CalculatorButton>
          <CalculatorButton onClick={() => {}}>1/x</CalculatorButton>

          {/* Row 5 */}
          <CalculatorButton onClick={() => handleNumberClick("0")}>
            0
          </CalculatorButton>
          <CalculatorButton onClick={() => {}}>+/-</CalculatorButton>
          <CalculatorButton onClick={() => handleNumberClick(".")}>
            .
          </CalculatorButton>
          <CalculatorButton onClick={() => handleOperationClick("+")}>
            +
          </CalculatorButton>
          <CalculatorButton onClick={handleEquals}>=</CalculatorButton>
        </div>
      </div>
    </StripedBackground>
  );
};

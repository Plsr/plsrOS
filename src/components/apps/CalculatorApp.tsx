import { useState } from "react";

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

  return (
    <div className=" inline-block bg-gray-200">
      <div className="flex flex-col p-2">
        {/* Display */}
        <div className="bg-white p-1 mb-2 border border-gray-500 text-right">
          <span className="text-xl text-black">{display}</span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-5 gap-1">
          {/* Row 1 */}
          <button className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-gray-500">
            MC
          </button>
          <button className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-gray-500">
            MR
          </button>
          <button className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-gray-500">
            MS
          </button>
          <button className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-gray-500">
            M+
          </button>
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm"
            onClick={handleClear}
          >
            C
          </button>

          {/* Row 2 */}
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-blue-700"
            onClick={() => handleNumberClick("7")}
          >
            7
          </button>
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-blue-700"
            onClick={() => handleNumberClick("8")}
          >
            8
          </button>
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-blue-700"
            onClick={() => handleNumberClick("9")}
          >
            9
          </button>
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-red-700"
            onClick={() => handleOperationClick("/")}
          >
            /
          </button>
          <button className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-gray-500">
            sqrt
          </button>

          {/* Row 3 */}
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-blue-700"
            onClick={() => handleNumberClick("4")}
          >
            4
          </button>
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-blue-700"
            onClick={() => handleNumberClick("5")}
          >
            5
          </button>
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-blue-700"
            onClick={() => handleNumberClick("6")}
          >
            6
          </button>
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-red-700"
            onClick={() => handleOperationClick("*")}
          >
            *
          </button>
          <button className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-gray-500">
            %
          </button>

          {/* Row 4 */}
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-blue-700"
            onClick={() => handleNumberClick("1")}
          >
            1
          </button>
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-blue-700"
            onClick={() => handleNumberClick("2")}
          >
            2
          </button>
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-blue-700"
            onClick={() => handleNumberClick("3")}
          >
            3
          </button>
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-red-700"
            onClick={() => handleOperationClick("-")}
          >
            -
          </button>
          <button className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-gray-500">
            1/x
          </button>

          {/* Row 5 */}
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-blue-700"
            onClick={() => handleNumberClick("0")}
          >
            0
          </button>
          <button className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-gray-500">
            +/-
          </button>
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-blue-700"
            onClick={() => handleNumberClick(".")}
          >
            .
          </button>
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-red-700"
            onClick={() => handleOperationClick("+")}
          >
            +
          </button>
          <button
            className="bg-gray-300 p-2 border border-gray-500 shadow-sm text-red-700"
            onClick={handleEquals}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

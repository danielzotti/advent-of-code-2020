import React from 'react';
import { ExecutionStatus, input, inputTest, Instruction, Instructions, Operations } from './Day8.inputs';
import { DayItem } from '../../shared/DayItem';

// Regular Expressions to read the rules
const regexp = /^(?<operation>.{3}) (?<argument>(\+|-)\d+)$/gm;

const inputItems = input.split('\n');
// const inputItems = inputTest.split('\n');

const parseInstructions = (inputItems: Array<string>) => {
  const instructions: Instructions = inputItems.reduce((instructions, instruction, index): Instructions => {

    // el = 'light red bags contain 1 bright white bag, 2 muted yellow bags.'
    const matches = instruction.matchAll(regexp);

    const match = [...matches][0]?.groups;
    if(!match) {
      return instructions;
    }
    // operation: 'jump'
    // argument: '+342'
    const { operation, argument } = match;

    return {
      ...instructions,
      [index]: {
        id: index,
        operation: operation as Operations,
        argument: parseInt(argument, 10),
        isAlreadyExecuted: false
      }
    } as Instructions;

  }, {} as Instructions | {});
  return instructions;
};

const execCode = (instructions: Instructions, instructionId: number = 0, accumulator: number = 0, stack: Array<Instruction> = []): ExecutionStatus => {
  const currentInstruction: Instruction = instructions[instructionId];
  if(currentInstruction.isAlreadyExecuted) {
    return { accumulator, nextInstructionId: null, stack } as ExecutionStatus;
  }
  instructions[instructionId] = { ...currentInstruction, isAlreadyExecuted: true };
  let nextInstruction: ExecutionStatus = {
    accumulator,
    nextInstructionId: currentInstruction.id + 1,
    stack: [...stack, currentInstruction]
  };
  switch(currentInstruction.operation) {
    case 'acc':
      nextInstruction = { ...nextInstruction, accumulator: accumulator + currentInstruction.argument };
      break;
    case 'jmp':
      nextInstruction = { ...nextInstruction, nextInstructionId: currentInstruction.id + currentInstruction.argument };
      break;
  }

  return execCode(instructions, nextInstruction.nextInstructionId as number, nextInstruction.accumulator, nextInstruction.stack);

};

const getAccumulatorValue = (inputItems: Array<string>) => {
  const instructions = parseInstructions(inputItems);
  const stack = execCode(instructions);
  console.log(stack);
  return stack.accumulator;
};

export const Day8: React.FC = () => {

  return (
    <>
      <DayItem day={ 8 } inputText={ input }>
        <span key="partA">{ getAccumulatorValue(inputItems) }</span>
        <span key="partB">TODO</span>
      </DayItem>
    </>
  );
};

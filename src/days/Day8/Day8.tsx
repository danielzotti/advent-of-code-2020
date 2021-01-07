import React from 'react';
import { ExecutionStatus, inputTest, Instruction, Instructions, Operations } from './Day8.inputs';
import { DayItem } from '../../shared/DayItem';

// Regular Expressions to read the rules
const regexp = /^(?<operation>.{3}) (?<argument>(\+|-)\d+)$/gm;

const inputItems = inputTest.split('\n');

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
  let currentInstruction: Instruction = { ...instructions[instructionId] };
  let currentInstructionList = { ...instructions };

  if(!currentInstruction || currentInstruction.isAlreadyExecuted) {
    // console.log('---------------LOOP--------------');
    return { accumulator, nextInstructionId: null, status: 'LOOP', stack } as ExecutionStatus;
  }

  currentInstruction = { ...currentInstruction, isAlreadyExecuted: true };
  currentInstructionList = { ...currentInstructionList, [currentInstruction.id]: currentInstruction };

  let nextInstruction: ExecutionStatus = {
    accumulator,
    nextInstructionId: currentInstruction.id + 1,
    status: 'EXECUTING',
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

  if(currentInstruction.id === Object.keys(currentInstructionList).length - 1) {
    // console.log('---------------END--------------');
    return { ...nextInstruction, nextInstructionId: null, status: 'END' } as ExecutionStatus;
  }

  return execCode(currentInstructionList, nextInstruction.nextInstructionId as number, nextInstruction.accumulator, nextInstruction.stack);

};

const getAccumulatorValue = (inputItems: Array<string>) => {
  const instructions = parseInstructions(inputItems);
  const stack = execCode(instructions);
  return stack.accumulator;
};

const getAccumulatorValueAfterFix = (inputItems: Array<string>) => {
  const instructions = parseInstructions(inputItems);

  let accumulator: number | null = null;

  for(let currentId = 0; currentId < Object.keys(instructions).length; currentId++) {

    const currentInstruction = { ...instructions[currentId] };

    if((currentInstruction.operation === 'nop' && currentInstruction.argument !== 0) || (currentInstruction.operation === 'jmp')) {
      const changedInstruction: Instruction = {
        ...currentInstruction,
        operation: currentInstruction.operation === 'nop' ? 'jmp' : 'nop',
      } as Instruction;

      const changedInstructions: Instructions = {
        ...instructions,
        [currentId]: changedInstruction
      };

      const stack = execCode(changedInstructions);

      if(stack.status === 'END') {
        accumulator = stack.accumulator;
        break;
      }
    }
  }
  return accumulator;
};

export const Day8: React.FC = () => {

  return (
    <>
      <DayItem day={ 8 } inputText={ inputTest }>
        <span key="partA">{ getAccumulatorValue(inputItems) }</span>
        <span key="partB">{ getAccumulatorValueAfterFix(inputItems) }</span>
      </DayItem>
    </>
  );
};

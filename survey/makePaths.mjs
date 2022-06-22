
export const makePaths = survey => {
  const paths = [];
  
  const makePathItem = (questionId = 0, path = []) => {
    const { answers } = survey[questionId];
    const end = [];
    const next = [];
    answers.forEach((answer, id) => {
      answer.next ? next.push({ nextQuestionId: answer.next, answerId: id }) : end.push(id);
    });
    if (end.length) {
      paths.push([...path, refactor(questionId, ...end)]);
    }
    if (next.length) {
      next.forEach(({ nextQuestionId, answerId }, id) => {
        makePathItem(nextQuestionId, [...path, refactor(questionId, answerId)]);
      });
    }
  }
  
  const refactor = (qId, ...aIdArr) => {
    return { [survey[qId].question]: aIdArr.map(id => survey[qId].answers[id].value).join('/') }
  }
  
  makePathItem();
  
  return paths;
}
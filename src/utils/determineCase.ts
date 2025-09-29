export const determineCase = (N0: number, A: number, K: number) => {
  if (N0 < A) {
    return { case: 'Caso A', description: '0 < N < A: La población colapsa hacia la extinción', color: 'red' };
  } else if (N0 >= A && N0 < K) {
    return { case: 'Caso B', description: 'A < N < K: La población crece hacia la capacidad de carga', color: 'green' };
  } else {
    return { case: 'Caso C', description: 'N > K: La población decrece hacia la capacidad de carga', color: 'yellow' };
  }
};

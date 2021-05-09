type ResultOnDemandDTO<T> = {
  totalIndex: number;
  currentIndex: number;
  nextIndex: number;
  prevIndex: number;
  hasNext: boolean;
  hasPrev: boolean;
  rangeList: number;
  list: Array<T>
};

export default ResultOnDemandDTO;

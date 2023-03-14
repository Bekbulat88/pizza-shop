
export type SortType = 
  { name: string;                                                                                                       
    sortProperty: string }

export interface FilterSliceState{
  searchValue: string;
  categoryId: number;
  sortType: SortType;
  currentPage: number;
}

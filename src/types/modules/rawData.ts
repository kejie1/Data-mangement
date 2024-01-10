export interface SliceSearch {
  id?: string;
  vehicleCode?: string;
  adcm?: string;
  labelNameList?: any[];
  path?: string;
  person?: string;
  location?: string;
  eventDescription?: string;
  stepSize?: string;
  eventTime?: string;
  error?: any[];
  startDate?: string;
  endDate?: string;
}
// export interface SliceResponse {
//   results: Result[];
//   total: number;
//   pageCount: number;
//   currentIndex: number;
//   hasNext: boolean;
// }

export interface SliceResponse {
  id: string;
  path: string;
  version: string;
  vehicleCode: string;
  startDate: string;
  endDate: string;
  labels: Label[];
  events: Event[];
  filesInfo?: any;
  dateCreated: string;
  adcm: string;
  obsBucket: string;
  location: string;
  person: string;
  mcapStatus: string;
  isImmediate: boolean;
  errors: string[];
  errorsDetail: ErrorsDetail[];
}

interface ErrorsDetail {
  errorName: string;
  errorType: string;
}

interface Event {
  adcm: string;
  date_updated: number;
  collect_site: string;
  event_description: string;
  _class: string;
  event_time: number;
}

interface Label {
  duration: number;
  end_date: number;
  total_mileage: number;
  start_mileage: number;
  date_updated: number;
  name: string;
  framelabel: Framelabel;
  _class: string;
  category: string;
  "ch-name": string;
  start_date: number;
  end_mileage: number;
}

interface Framelabel {
  id: number;
  position: Position;
}

interface Position {
  coordinates?: any;
}
// export interface EventResponse {
//     results: Result[];
//     total: number;
//     pageCount: number;
//     currentIndex: number;
//     hasNext: boolean;
//   }

export interface EventResponse {
  id: string;
  obsKey: string;
  version: string;
  vehicleCode: string;
  eventDescription: string;
  dateCreated: string;
  eventTime: string;
  label: (Label | Label2)[];
  adcm: string;
  location: string;
}

interface Label2 {
  duration?: any;
  total_mileage?: any;
  start_mileage: number;
  date_updated: number;
  name: string;
  framelabel: Framelabel;
  _class: string;
  category: string;
  "ch-name": string;
  start_date: number;
}

interface Framelabel {
  id: number;
  position: Position;
}

interface Position {
  coordinates?: any;
}

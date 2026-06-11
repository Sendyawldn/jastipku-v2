import { PaginationDto } from "../../common/dto/pagination.dto";

export class ListOrdersQueryDto extends PaginationDto {
  // Inherits limit/take and cursor from PaginationDto
  // Note: we can map limit to take if needed, but PaginationDto uses take and cursor.
}

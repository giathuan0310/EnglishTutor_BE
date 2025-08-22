
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class PurchasePackageDto {
    @IsMongoId({ message: 'Package ID is not a valid Mongo ID' })
    @IsNotEmpty()
    packageId: string;
}
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserType {
  Gymsoft = "Gymsoft",
  Varzeshsoft = "Varzeshsoft",
}

export enum UserStatus {
  Active = "Active",
  Down = "Down",
  Pending = "Pending",
}

@Entity({ name: "_users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { name: "name" })
  name: string;

  @Column("varchar", { name: "website" })
  website: string;

  @Column("varchar", { name: "server_url" })
  serverUrl: string;

  @Column("integer", { name: "server_port" })
  serverPort: number;

  @Column("varchar", { name: "type" })
  type: UserType;

  @Column("varchar", { name: "phone" })
  phone: string;

  @Column("varchar", { name: "status" })
  status: UserStatus;

  @Column({ name: "is_delete", default: false })
  isDelete?: boolean;
}

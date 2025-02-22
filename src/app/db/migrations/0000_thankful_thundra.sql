CREATE TYPE "public"."gender" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TABLE "favorite_foods" (
	"user_id" integer NOT NULL,
	"food_item_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_food_item_pk" PRIMARY KEY("user_id","food_item_id")
);
--> statement-breakpoint
CREATE TABLE "food_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "food_categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "food_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"food_category_id" integer,
	"name" varchar(100) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "food_nutrients" (
	"id" serial PRIMARY KEY NOT NULL,
	"food_id" integer,
	"calories" numeric(10, 2),
	"protein" numeric(10, 2),
	"fat" numeric(10, 2),
	"carbs" numeric(10, 2),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"token" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "slugs" (
	"id" serial PRIMARY KEY NOT NULL,
	"object_id" integer NOT NULL,
	"slug" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "slugs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "user_infos" (
	"id" integer PRIMARY KEY NOT NULL,
	"height" integer,
	"weight" integer,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"age" integer,
	"gender" "gender"
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(120) NOT NULL,
	"password" varchar(200) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "favorite_foods" ADD CONSTRAINT "favorite_foods_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_foods" ADD CONSTRAINT "favorite_foods_food_item_id_food_items_id_fk" FOREIGN KEY ("food_item_id") REFERENCES "public"."food_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food_items" ADD CONSTRAINT "food_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food_items" ADD CONSTRAINT "food_items_food_category_id_food_categories_id_fk" FOREIGN KEY ("food_category_id") REFERENCES "public"."food_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food_nutrients" ADD CONSTRAINT "food_nutrients_food_id_food_items_id_fk" FOREIGN KEY ("food_id") REFERENCES "public"."food_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_infos" ADD CONSTRAINT "user_infos_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "food_category_name_index" ON "food_categories" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "food_item_name_index" ON "food_items" USING btree ("name");--> statement-breakpoint
CREATE INDEX "sessions_user_id_index" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_token_index" ON "sessions" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "slug_index" ON "slugs" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "object_id_index" ON "slugs" USING btree ("object_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_index" ON "users" USING btree ("email");
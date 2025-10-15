-- driving_leaflets.sql
-- Use in Supabase SQL editor (SQL Editor -> New Query -> Run)
-- Creates tables for a driving leaflets (questions) app.

create table if not exists categories (
  id bigserial primary key,
  name text not null,
  description text
);

create table if not exists leaflets (
  id bigserial primary key,
  title text not null,
  content text,
  image_url text,
  category_id bigint references categories(id) on delete set null,
  created_by uuid,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists questions (
  id bigserial primary key,
  leaflet_id bigint references leaflets(id) on delete cascade,
  question_text text not null,
  image_url text
);

create table if not exists answers (
  id bigserial primary key,
  question_id bigint references questions(id) on delete cascade,
  answer_text text not null,
  is_correct boolean default false
);

create table if not exists results (
  id bigserial primary key,
  user_id uuid,
  score int,
  total int,
  created_at timestamptz default now()
);

-- Sample data
insert into categories (name, description) values
('Пътни знаци', 'Видове пътни знаци - задължения и указания'),
('Правила за предимство', 'Кой има предимство в различни ситуации'),
('Маневри и безопасност', 'Маневри, дистанция и безопасно поведение');

insert into leaflets (title, content, category_id) values
('Основни пътни знаци', 'Колекция от важни пътни знаци и тяхното значение.', 1),
('Предимство на кръстовища', 'Кратко обяснение кога имаш предимство и кога не.', 2);

-- Questions for leaflet 1
insert into questions (leaflet_id, question_text) values
(1, 'Какво означава този знак: червен кръг с бяла лента по средата?'),
(1, 'Какво означава син неизчертан кръг с бяла стрелка наляво?');

-- Answers for question 1
insert into answers (question_id, answer_text, is_correct) values
(1, 'Забранен достъп', true),
(1, 'Указва пешеходна зона', false),
(1, 'Ограничение на скоростта', false),
(1, 'Край на всички ограничения', false);

-- Answers for question 2
insert into answers (question_id, answer_text, is_correct) values
(2, 'Задължителна посока наляво', true),
(2, 'Край на всички ограничения', false),
(2, 'Зона със специален режим', false),
(2, 'Забранено завиване наляво', false);

-- Question for leaflet 2
insert into questions (leaflet_id, question_text) values
(2, 'Кой има предимство на кръстовище с правилото на дясната ръка?');

insert into answers (question_id, answer_text, is_correct) values
(3, 'Колата идваща от дясно', true),
(3, 'Колата идваща от ляво', false),
(3, 'Пешеходеца', false),
(3, 'Всички имат предимство', false);

-- Sanatana: seed data for quotes
-- Run this AFTER schema.sql, in the same SQL editor.
--
-- Uses fixed, readable UUIDs (rather than gen_random_uuid()) purely so this
-- file is re-runnable and easy to read/debug during development — real
-- user-facing tables (gratitude_entries, journal_entries) won't do this.

insert into quotes (id, text, source, translation_notes) values
  ('00000000-0000-0000-0000-000000000001',
   'Yoga is the stilling of the fluctuations of the mind.',
   'Yoga Sutras 1.2',
   'The opening definition of yoga in Patanjali''s Sutras — not a physical posture, but a state of mental stillness.'),

  ('00000000-0000-0000-0000-000000000002',
   'The posture for meditation should be steady and comfortable.',
   'Yoga Sutras 2.46',
   'Sthira sukham asanam — the classical instruction behind every asana practice.'),

  ('00000000-0000-0000-0000-000000000003',
   'Established in yoga, perform your actions, abandoning attachment, remaining even-minded in success and failure. This evenness of mind is called yoga.',
   'Bhagavad Gita 2.48',
   NULL),

  ('00000000-0000-0000-0000-000000000004',
   'As a lamp in a windless place does not flicker, so is the disciplined mind of a yogi practicing meditation.',
   'Bhagavad Gita 6.19',
   NULL),

  ('00000000-0000-0000-0000-000000000005',
   'For one who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, the mind remains the greatest enemy.',
   'Bhagavad Gita 6.6',
   NULL),

  ('00000000-0000-0000-0000-000000000006',
   'Wherever the restless and unsteady mind wanders, one should draw it back and bring it under the control of the Self alone.',
   'Bhagavad Gita 6.26',
   NULL),

  ('00000000-0000-0000-0000-000000000007',
   'From contentment comes supreme joy.',
   'Yoga Sutras 2.42',
   'Santoshad anuttamah sukha labhah — santosha (contentment) as one of the niyamas.'),

  ('00000000-0000-0000-0000-000000000008',
   'The one who is content in all conditions, self-controlled, firm in conviction, with mind and intellect surrendered — that devotee is dear to me.',
   'Bhagavad Gita 12.13-14',
   'Abridged from a longer passage describing the qualities of a devoted person.'),

  ('00000000-0000-0000-0000-000000000009',
   'Discipline, self-study, and surrender to the divine together make up the yoga of action.',
   'Yoga Sutras 2.1',
   'Tapah svadhyaya ishvara pranidhanani kriya yogah — svadhyaya (self-study) as a core practice, not just reflection.'),

  ('00000000-0000-0000-0000-000000000010',
   'There is nothing in this world as purifying as knowledge.',
   'Bhagavad Gita 4.38',
   NULL),

  ('00000000-0000-0000-0000-000000000011',
   'Let a person lift themselves by their own self, and let them not degrade themselves; for the self alone is the friend of the self, and the self alone is the enemy of the self.',
   'Bhagavad Gita 6.5',
   NULL),

  ('00000000-0000-0000-0000-000000000012',
   'You have a right to your actions, but never to the fruits of those actions.',
   'Bhagavad Gita 2.47',
   'Likely the single most-quoted verse of the Gita — the basis for the concept of nishkama karma (desireless action).'),

  ('00000000-0000-0000-0000-000000000013',
   'The contact between the senses and their objects gives rise to heat and cold, pleasure and pain. These are fleeting; they come and go. Bear them patiently.',
   'Bhagavad Gita 2.14',
   NULL)
on conflict (id) do nothing;

insert into quote_themes (quote_id, theme) values
  ('00000000-0000-0000-0000-000000000001', 'yoga'),
  ('00000000-0000-0000-0000-000000000002', 'yoga'),
  ('00000000-0000-0000-0000-000000000003', 'yoga'),
  ('00000000-0000-0000-0000-000000000003', 'general'),
  ('00000000-0000-0000-0000-000000000004', 'meditation'),
  ('00000000-0000-0000-0000-000000000005', 'meditation'),
  ('00000000-0000-0000-0000-000000000005', 'self-study'),
  ('00000000-0000-0000-0000-000000000006', 'meditation'),
  ('00000000-0000-0000-0000-000000000007', 'gratitude'),
  ('00000000-0000-0000-0000-000000000008', 'gratitude'),
  ('00000000-0000-0000-0000-000000000009', 'self-study'),
  ('00000000-0000-0000-0000-000000000010', 'self-study'),
  ('00000000-0000-0000-0000-000000000011', 'self-study'),
  ('00000000-0000-0000-0000-000000000011', 'meditation'),
  ('00000000-0000-0000-0000-000000000012', 'general'),
  ('00000000-0000-0000-0000-000000000013', 'general'),
  ('00000000-0000-0000-0000-000000000013', 'gratitude')
on conflict (quote_id, theme) do nothing;

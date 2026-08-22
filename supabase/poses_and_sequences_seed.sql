-- Sanatana: seed data for poses + sequences
-- Run this AFTER poses_and_sequences.sql.

insert into poses (id, name_sanskrit, name_english, instructions, benefits, cautions) values
  ('10000000-0000-0000-0000-000000000001', 'Tadasana', 'Mountain Pose',
   'Stand with feet together or hip-width apart, weight evenly distributed. Engage the thighs, lengthen the spine, and relax the shoulders down and back.',
   'Improves posture and balance; the grounding foundation for every standing pose.',
   NULL),

  ('10000000-0000-0000-0000-000000000002', 'Adho Mukha Svanasana', 'Downward-Facing Dog',
   'From hands and knees, tuck the toes and lift the hips up and back into an inverted V. Press the hands into the floor and let the head hang relaxed between the arms.',
   'Stretches the hamstrings, calves, and shoulders; builds arm and core strength.',
   'Avoid or modify with wrist injuries, high blood pressure, or late-stage pregnancy.'),

  ('10000000-0000-0000-0000-000000000003', 'Trikonasana', 'Triangle Pose',
   'Step the feet wide, turn the front foot out and the back foot slightly in. Extend the arms parallel to the floor, then hinge at the front hip to reach the front hand toward the shin or floor.',
   'Stretches the hips, hamstrings, and spine; strengthens the legs and core.',
   'Avoid with low blood pressure or migraine; keep the head neutral rather than dropping it.'),

  ('10000000-0000-0000-0000-000000000004', 'Balasana', 'Child''s Pose',
   'Kneel with big toes touching, knees wide or together. Sit back onto the heels and fold forward, extending the arms forward or resting them alongside the body.',
   'Gently stretches the hips, thighs, and lower back; calms the nervous system.',
   'Avoid with knee injuries; place a cushion between hips and heels if needed.'),

  ('10000000-0000-0000-0000-000000000005', 'Bhujangasana', 'Cobra Pose',
   'Lie face down with hands under the shoulders. Press the tops of the feet and thighs into the floor, and on an inhale, lift the chest while keeping the elbows slightly bent.',
   'Strengthens the spine and opens the chest and shoulders.',
   'Avoid with back injuries or during pregnancy; keep the lift gentle.'),

  ('10000000-0000-0000-0000-000000000006', 'Virabhadrasana I', 'Warrior I',
   'Step one foot back, angling it slightly in, and bend the front knee over the ankle. Square the hips forward and raise the arms overhead.',
   'Builds strength in the legs and core; opens the hips and chest.',
   'Avoid or modify with hip or knee injuries.'),

  ('10000000-0000-0000-0000-000000000007', 'Sukhasana', 'Easy Pose',
   'Sit cross-legged on the floor or a cushion, spine tall, hands resting on the knees.',
   'A stable, comfortable base for breathing and meditation practice.',
   'Sit on a cushion or block if the hips are tight, to avoid straining the lower back.'),

  ('10000000-0000-0000-0000-000000000008', 'Savasana', 'Corpse Pose',
   'Lie flat on the back, legs relaxed and slightly apart, arms at the sides with palms facing up. Close the eyes and let the whole body soften.',
   'Allows the nervous system to settle and integrates the effects of the practice.',
   'Support the knees with a cushion if the lower back is uncomfortable flat on the floor.')
on conflict (id) do nothing;

insert into sequences (id, name, description) values
  ('20000000-0000-0000-0000-000000000001', 'Morning Grounding Sequence',
   'A short standing sequence to wake up the body and settle the mind before the day starts.'),
  ('20000000-0000-0000-0000-000000000002', 'Wind-Down Sequence',
   'A gentle floor-based sequence for winding down in the evening.')
on conflict (id) do nothing;

insert into sequence_poses (sequence_id, pose_id, position, hold_seconds) values
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 1, 30),
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 2, 45),
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 3, 30),
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000005', 4, 20),
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000004', 5, 60),

  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000007', 1, 30),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000004', 2, 60),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000005', 3, 20),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000008', 4, 120)
on conflict (sequence_id, position) do nothing;
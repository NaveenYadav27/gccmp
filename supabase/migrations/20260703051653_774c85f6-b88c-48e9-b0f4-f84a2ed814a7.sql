
-- Daily enterprise missions attempts
CREATE TABLE public.daily_mission_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  mission_id TEXT NOT NULL,
  mission_date DATE NOT NULL DEFAULT CURRENT_DATE,
  findings JSONB NOT NULL DEFAULT '{}'::jsonb,
  score INT,
  ai_feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.daily_mission_attempts TO authenticated;
GRANT ALL ON public.daily_mission_attempts TO service_role;
ALTER TABLE public.daily_mission_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own daily attempts" ON public.daily_mission_attempts
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "instructors read daily attempts" ON public.daily_mission_attempts
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'instructor') OR public.has_role(auth.uid(), 'admin'));

-- XP / gamification
CREATE TABLE public.user_xp (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  xp INT NOT NULL DEFAULT 0,
  level INT NOT NULL DEFAULT 1,
  streak_days INT NOT NULL DEFAULT 0,
  last_active DATE,
  badges JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.user_xp TO authenticated;
GRANT ALL ON public.user_xp TO service_role;
ALTER TABLE public.user_xp ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own xp" ON public.user_xp
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "instructors read xp" ON public.user_xp
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'instructor') OR public.has_role(auth.uid(), 'admin'));

-- Skill unlocks
CREATE TABLE public.skill_unlocks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  skill_key TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, skill_key)
);
GRANT SELECT, INSERT, DELETE ON public.skill_unlocks TO authenticated;
GRANT ALL ON public.skill_unlocks TO service_role;
ALTER TABLE public.skill_unlocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own skill unlocks" ON public.skill_unlocks
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "instructors read skills" ON public.skill_unlocks
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'instructor') OR public.has_role(auth.uid(), 'admin'));

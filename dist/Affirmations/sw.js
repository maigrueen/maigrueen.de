const staticCacheName = 'site-static-v1';
const assets = [
  '/',
  '/index.html',
  'img/a_moment_to_relax_bbpa.svg',
  'img/a_whole_year_vnfm.svg',
  'img/adventure_map_hnin.svg',
  'img/after_the_rain_-58-op.svg',
  'img/among_nature_p1xb.svg',
  'img/art_lover_re_fn8g.svg',
  'img/art_thinking_3g82.svg',
  'img/autumn_re_rwy0.svg',
  'img/balloons_re_8ymj.svg',
  'img/book_lover_re_rwjy.svg',
  'img/book_reading_kx-9-s.svg',
  'img/conceptual_idea_xw7k.svg',
  'img/coolness_dtmq.svg',
  'img/country_side_re_0dou.svg',
  'img/departing_re_mlq3.svg',
  'img/design_inspiration_fmjm.svg',
  'img/dreamer_re_9tua.svg',
  'img/explore_re_8l4v.svg',
  'img/fall_thyk.svg',
  'img/fireworks_q-5-ji.svg',
  'img/forming_ideas_re_2afc.svg',
  'img/friends_r511.svg',
  'img/gardening_re_e658.svg',
  'img/getting_coffee_re_f2do.svg',
  'img/happy_feeling_slmw.svg',
  'img/high_five_re_jy71.svg',
  'img/hiking_re_k0bc.svg',
  'img/in_thought_re_qyxl.svg',
  'img/jewelry_iima.svg',
  'img/love_re_mwbq.svg',
  'img/loving_story_re_wo5x.svg',
  'img/missed_chances_k-3-cq.svg',
  'img/mornings_re_cofi.svg',
  'img/nature_benefits_re_kk70.svg',
  'img/nature_on_screen_xkli.svg',
  'img/new_ideas_jdea.svg',
  'img/polaroid_re_481f.svg',
  'img/powerful_re_frhr.svg',
  'img/reading_re_29f8.svg',
  'img/right_direction_tge8.svg',
  'img/starry_window_re_0v82.svg',
  'img/step_to_the_sun_nxqq.svg',
  'img/studying_re_deca.svg',
  'img/summer_jx06.svg',
  'img/super_thank_you_re_f8bo.svg',
  'img/things_to_say_ewwb.svg',
  'img/thoughts_re_3ysu.svg',
  'img/through_the_park_lxnl.svg',
  'img/together_re_a8x4.svg',
  'img/tree_swing_re_pqee.svg',
  'img/waiting__for_you_ldha.svg',
  'img/walking_outside_re_56xo.svg',
  'img/welcome_re_h3d9.svg',
  'img/welcoming_re_x0qo.svg',
  'img/wilderness_81ka.svg',
  'img/with_love_re_1q3m.svg',
  'img/working_from_anywhere_re_9obt.svg',
];
// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});
// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});
// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
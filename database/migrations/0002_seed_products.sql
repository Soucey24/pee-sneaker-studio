INSERT OR IGNORE INTO products (id, category, name, tag, price, image_url, description, popularity, status, created_at, updated_at) VALUES
  ('ember-hi', 'Sneakers', 'Ember Hi-Top', 'New drop', 189, '/assets/shoe-1.jpg', 'A high-top built with a padded collar, durable canvas, and a warm ember finish.', 98, 'Active', '2026-08-04', '2026-09-04'),
  ('static-runner', 'Sneakers', 'Static Runner', 'Best seller', 165, '/assets/shoe-2.jpg', 'A lightweight everyday runner with a responsive sole and clean technical lines.', 96, 'Active', '2026-07-21', '2026-09-04'),
  ('dust-low', 'Shoes', 'Dust Low Suede', 'Limited', 142, '/assets/shoe-3.jpg', 'Soft suede, low profile, and an easy neutral tone for quiet daily rotation.', 89, 'Active', '2026-06-15', '2026-09-04'),
  ('blackout-court', 'Shoes', 'Blackout Court', 'Big Pee pick', 210, '/assets/shoe-4.jpg', 'A structured court classic with a blackout upper and serious street presence.', 94, 'Active', '2026-05-28', '2026-09-04'),
  ('cloud-slide', 'Slippers', 'Cloud Slide', 'New comfort', 78, '/assets/shoe-3.jpg', 'Cloud-soft slides for recovery days, quick errands, and post-game comfort.', 91, 'Active', '2026-08-18', '2026-09-04'),
  ('after-hours-slide', 'Slippers', 'After Hours Slide', 'Big Pee pick', 86, '/assets/shoe-4.jpg', 'A relaxed after-hours slide with a supportive footbed and easy slip-on shape.', 86, 'Active', '2026-04-10', '2026-09-04');

INSERT OR IGNORE INTO product_sizes (product_id, size, stock) VALUES
  ('ember-hi', 40, 12), ('ember-hi', 41, 12), ('ember-hi', 42, 12), ('ember-hi', 43, 12), ('ember-hi', 44, 12), ('ember-hi', 45, 12),
  ('static-runner', 39, 12), ('static-runner', 40, 12), ('static-runner', 41, 12), ('static-runner', 42, 12), ('static-runner', 43, 12), ('static-runner', 44, 12),
  ('dust-low', 40, 12), ('dust-low', 41, 12), ('dust-low', 42, 12), ('dust-low', 43, 12), ('dust-low', 44, 12),
  ('blackout-court', 41, 12), ('blackout-court', 42, 12), ('blackout-court', 43, 12), ('blackout-court', 44, 12), ('blackout-court', 45, 12), ('blackout-court', 46, 12),
  ('cloud-slide', 39, 12), ('cloud-slide', 40, 12), ('cloud-slide', 41, 12), ('cloud-slide', 42, 12), ('cloud-slide', 43, 12), ('cloud-slide', 44, 12),
  ('after-hours-slide', 40, 12), ('after-hours-slide', 41, 12), ('after-hours-slide', 42, 12), ('after-hours-slide', 43, 12), ('after-hours-slide', 44, 12), ('after-hours-slide', 45, 12);

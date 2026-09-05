/**
 * Concept imagery — high-quality Unsplash CDN photography used only as
 * demo/concept visuals for this demonstration website.
 * All images load lazily and degrade to a branded gradient fallback.
 */

const u = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const IMG = {
  heroAthlete: u('1534438327276-14e5300c3a48', 1400),
  heroSecondary: u('1517836357463-d25dfeac3438', 900),
  aboutMain: u('1526506118085-60ce8714f8c5', 1200),
  aboutSecondary: u('1540497077202-7c8a3999166f', 800),

  strength: u('1517963879433-6ad2b056d712', 1000),
  personalTraining: u('1571019613454-1cb2f99b2d8b', 1000),
  functional: u('1550345332-09e3ac987658', 1000),
  transformation: u('1574680096145-d05b474e2155', 1000),

  trainerAlex: u('1560250097-0b93528c311a', 800),
  trainerJordan: u('1500648767791-00dcc994a43e', 800),
  trainerMaya: u('1573496359142-b8d87734a5a2', 800),

  facilityStrengthZone: u('1534438327276-14e5300c3a48', 900),
  facilityCardioZone: u('1540497077202-7c8a3999166f', 900),
  facilityFunctional: u('1550345332-09e3ac987658', 900),
  facilityStudio: u('1583454110551-21f2fa2afe61', 900),
  facilityRecovery: u('1544367567-0f2fcb009e0b', 900),

  galleryStrength1: u('1517836357463-d25dfeac3438', 1000),
  galleryStrength2: u('1534367610401-9f5ed68180aa', 1000),
  galleryStrength3: u('1540497077202-7c8a3999166f', 1000),
  galleryTraining1: u('1581009146145-b5ef050c2e1e', 1000),
  galleryTraining2: u('1571902943202-507ec2618e8f', 1000),
  galleryTraining3: u('1518611012118-696072aa579a', 1000),
  galleryCommunity1: u('1526506118085-60ce8714f8c5', 1000),
  galleryCommunity2: u('1574680096145-d05b474e2155', 1000),
  galleryCommunity3: u('1517836357463-d25dfeac3438', 1000),
  galleryFacilities1: u('1534438327276-14e5300c3a48', 1000),
  galleryFacilities2: u('1558611848-73f7eb4001a1', 1000),
  galleryFacilities3: u('1570829460005-c840387bb1ca', 1000),
}

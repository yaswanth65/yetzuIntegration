# CMS Sections Summary

## Home Page (5 sections)
1. **Hero Section** - Top message, avatars, heading, subheading, hero image, stats
2. **Video Section** - Heading, YouTube embed URL
3. **Webinars Section** - Uses shared component
4. **1:1 Mentorship** - Heading, subtext, button, cards (4 cards with title/desc/colors)
5. **Assignment Support** - Heading, button, 4 cards (title/desc/image each)
6. **Testimonials** - Uses shared component
7. **Join Community** - Uses shared component
8. **Programs & Webinars** - Uses shared component
9. **Resources** - Heading, subheading, button, featured resource (title/excerpt/image/author/date/avatar), 3 resource cards
10. **FAQs** - Heading, subheading, "Still have questions" box, 5 FAQ items (question/answer)
11. **Trusted By Leaders** - Uses shared component

## About Us Page (8 sections)
1. **About Hero** - Heading (with highlight word), subheading, buttons (2), 6 hero cards (image/name/expertise)
2. **Founder Story** - Section label, founder name, paragraphs (2), founder image, achievements (6)
3. **Team Section** - Heading, subheading, button, 6 team cards (image/badge/name/expertise/description)
4. **Mission & Vision** - Heading, left image, mission card (title/desc), vision card (title/desc), right image
5. **Initiatives** - Heading, subheading, 4 initiative cards (year/title)
6. **Purpose & Belief** - Heading, subheading, "Our Purpose" (title/desc), "Core Belief" (title/desc), large image
7. **Our Impact** - Heading, subheading, 4 impact cards (image)
8. **Trusted By Leaders** - Uses shared component

## Courses Page (8 sections)
1. **Courses Hero** - Heading (with highlights), subheading, buttons (2), hero image
2. **Course Filters** - Search, min/max cost fields (labels only, data from backend)
3. **Course Cards** - Button texts, empty state messages (data from backend)
4. **Testimonials** - Uses shared component
5. **Certification** - Heading, button, certification image, 3 steps (title/desc)
6. **FAQs** - Same as Home FAQ
7. **Promo Cards** - 3 cards (theme/title/description/logo image/link text)
8. **Book Slot** - Heading (with highlights), subheading, button text

## Assignments Page (4 sections)
1. **Meet The Brains** - Heading (with highlight), subheading, buttons (2), team image
2. **Assignment Workflow Steps** - Heading, subheading, button, 4 steps (title/desc/image)
3. **Assignment Workflow** - Heading, subheading, button, 4 workflow cards (title/desc), 10 tags/chips
4. **FAQs** - Same as Home FAQ

## Contact Us Page (5 sections)
1. **Contact Form** - Left side (button text, heading, subheading with email, support info, phone), Form fields (all placeholders/labels), Success message (title/msg/button)
2. **Our Offices** - Heading, subheading, contact info (6 items with icon/title/detail), map embed URL
3. **Resource Cards** - Heading, subheading, 3 resource cards (image/title/excerpt)
4. **FAQs** - Same as Home FAQ
5. **Book Slot** - Same as Courses Book Slot

## Fields Included in Each Editor
- **Text Fields**: All headings, subheadings, descriptions, button texts, labels
- **Image Uploads**: Hero images, card images, avatars, icons, logos (with dimensions noted)
- **Arrays**: Stats, cards, FAQ items, team members, steps, tags
- **Colors**: Background colors, text colors, icon background colors
- **Links**: YouTube URLs, map embed URLs, resource links
- **Form Config**: Field labels, placeholders, validation messages, success messages

## Notes
- All sections are static for now (backend integration later)
- Edits in CMS should directly update the public pages
- Shared components (Testimonials, TrustedByLeaders, etc.) have placeholder editors
- Course data (pricing, details) comes from backend via `/lib/queries/courses/useCoursesService`

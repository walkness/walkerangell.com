---
slug: intranet
name: Corporate Intranet
shortName: Intranet
screenshot: ../../../../images/development/intranet.jpg
launchDate: 2016-11-01
primaryColor: [190, 28, 45]
technologies: [react, django, sass]
hosting: [webfaction, aws]
order: 0
---
#### Background

My client had been using the same online system to manage their business processes for over 15 years, which meant the system was clunky and slow for users and expensive to maintain. I worked with the group's management and the system's users to develop and implement a new system with a clean, easy-to-use interface that addressed all of the challenges present in the old system.

#### Features

The application serves two main functions: tracking incoming RFPs, and fetching manufacturing quotes.

The RFP management portion allows sales people to submit new RFPs, which can be assigned to proposal writers in the marketing group. Users can easily filter RFPs by date, client, sales person, etc., and email notifications are sent to user-assignable groups when RFPs are submitted and assigned.

The manufacturing quotation portion lets users input specifications for different components to receive a detailed cost estimate for manufacturing and distribution, based upon data input and updated by the manufacturing group. This segment quickly became the most complicated portion to implement, as the system tracks dozens of components, each of which has its own cost structure.

#### Design & Development Work

I developed a frontend built entirely in React/Redux that consumes a custom API served by a Django backend. The frontend is clean and usable, which I designed using the Bootstrap 4 framework.

export default function LearnerLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="learner-layout">
        <header>{/* Learner-specific header */}</header>
        <main>{children}</main>
      </div>
    )
  }
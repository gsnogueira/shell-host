interface ShellTopbarProps {
  title: string
  subtitle: string
}

export function ShellTopbar({ title, subtitle }: ShellTopbarProps) {
  return (
    <header className="sh-topbar">
      <div className="sh-topbar-inner">
        <div>
          <div className="sh-page-title">{title}</div>
          <div className="sh-page-sub">{subtitle}</div>
        </div>
      </div>
    </header>
  )
}
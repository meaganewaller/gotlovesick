import AccessCounter from '@/components/AccessCounter';

export default function Footer() {
  return (
    <footer>
      <section>
        <div>
          <p>
            &copy; 2024-{new Date().getFullYear()} - brought to you by{' '}
            <a href="https://meaganwaller.com" className="">
              Meagan Waller
            </a>
          </p>
        </div>
        <AccessCounter />
      </section>
    </footer>
  );
}

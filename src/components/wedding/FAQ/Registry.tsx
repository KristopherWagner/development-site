import Link from '../Link';
import Question from './Question';

function BatCon() {
  return (
    <Link
      href="https://action.batcon.org/site/Donation2?df_id=1500&mfc_pref=T&1500.donation=form1"
      text="Bat Conservation International"
    />
  );
}

function EveryCat() {
  return (
    <Link
      href="https://everycat.salsalabs.org/main-donation-form/index.html"
      text="EveryCat Health Foundation"
    />
  );
}

function Lubee() {
  return (
    <Link href="https://www.lubee.org/donate" text="Lubee Bat Conservancy" />
  );
}

function MauiNui() {
  return (
    <Link
      href="https://www.mauireefs.org/"
      text="Maui Nui Marine Resource Council"
    />
  );
}

function CarbonOffsets() {
  return (
    <Link
      href="https://shop.8billiontrees.com/search?q=offset"
      text="carbon offsets"
    />
  );
}

export default function Registry() {
  return (
    <>
      <Question>Do you have a registry?</Question>
      <p className="body1">
        We have decided to not have a registry; we understand that attending our
        wedding is expensive, and your presence is the best gift. However, if
        you wish to give, we will gratefully accept a small contribution towards
        our honeymoon, next home, or joining Disney&apos;s Vacation Club.
        Alternatively, we would be honored if you would consider making a
        donation to one of our favorite charities in lieu of a traditional
        wedding gift. <BatCon />
        {', '}
        <EveryCat />
        {', '}
        <MauiNui />
        {', and '}
        <Lubee />
        {
          ' are organizations that are close to our hearts and we believe in their missions.'
        }
        {' You could also purchase '}
        <CarbonOffsets />
        {
          ' for your travel to help us with our goal of having a carbon neutral wedding.'
        }
      </p>
    </>
  );
}

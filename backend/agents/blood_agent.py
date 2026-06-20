from tools import search_donors


class PulseLinkAgent:

    def find_donors(self, blood_group):
        return search_donors(blood_group)